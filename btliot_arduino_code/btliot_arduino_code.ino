#include "DHT.h"
#include <ESP8266WiFi.h>
#include <AsyncMqttClient.h>
#include <Ticker.h>
#include <string.h>
#include <stdlib.h>

// Led / 1 = true = on = HIGHT / 0 = false= off = LOW
int led_1 = 2;
int led_2 = 5;
int led_1_status = 1;
int led_2_status = 1;

// DHT11 and light
#define SENSOR_PIN A0  
#define DHTPIN 14
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

float temp;
float hum;
int light = 0;
int bui = 0;

// Wifi
#define WIFI_SSID "iotbtl"
#define WIFI_PASSWORD "06060404"

WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

//Mqtt broker
#define MQTT_HOST IPAddress(192, 168, 43, 70)
#define MQTT_PORT 1883
#define MQTT_PUB_DHT "esp/dht"
#define MQTT_PUB_LED "esp/led"
#define MQTT_USERNAME "duc_nhat"
#define MQTT_PASSWORD "123456"

AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;

unsigned long previousMillis = 0;
const long interval = 3000;

//Function
void connectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to Wi-Fi.");
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Disconnected from Wi-Fi.");
  mqttReconnectTimer.detach(); // vo hieu ket noi mqtt trong khi ket noi wifi
  wifiReconnectTimer.once(2, connectToWifi);
}

void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void onMqttConnect(bool sessionPresent) {
  Serial.print("Connected to MQTT.");
  Serial.print("Session present: ");
  Serial.println(sessionPresent);
  // sub sau khi kết nối mqtt thành công
  uint16_t packetIdSub = mqttClient.subscribe(MQTT_PUB_LED, 2);
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

void onMqttPublish(uint16_t packetId) {
  Serial.print("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void doPubDHT() {
  String mess = "temperature " + String(temp) + " humidity " + String(hum) + " light " + String(light) + " bui " + String(bui);
  // QoS 1 == gửi ít nhất 1 lần, có thể gửi nhiều lần
  uint16_t packetIdPub = mqttClient.publish(MQTT_PUB_DHT, 1, true, String(mess).c_str());
                           
  Serial.printf("Nhiệt độ: %.2f \n", temp);
  Serial.printf("Độ ẩm: %.2f \n", hum);
  Serial.printf("Ánh sáng: %d \n", light);
  Serial.printf("Bụi: %d \n", bui);
}

void doPubLed() {
  // đặt check đằng trước để lưu ý backend chỉ xử lý pub này
  // vì trong backend cũng có hàm pub, ta không muốn call back của back xử lý pub đó
  String mess = "check led_1 " + String(led_1_status) + " led_2 " + String(led_2_status);
  // QoS 1 == gửi ít nhất 1 lần, có thể gửi nhiều lần
  uint16_t packetIdPub = mqttClient.publish(MQTT_PUB_LED, 1, true, String(mess).c_str());
                            
  Serial.printf("Đèn 1: %s \n", (led_1_status ? "ON" : "OFF"));
  Serial.printf("Đèn 2: %s \n", (led_2_status ? "ON" : "OFF"));
}

void onMqttSubscribe(uint16_t packetId, uint8_t qos) {
  Serial.print("Subscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.print(packetId);
  Serial.print("  qos: ");
  Serial.println(qos);
  doPubLed();
}

void onMqttUnsubscribe(uint16_t packetId) {
  Serial.print("Unsubscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}


void onMqttMessage(char* topic, char* payload, const AsyncMqttClientMessageProperties& properties,
                   const size_t& len, const size_t& index, const size_t& total)
{
  char message[len + 1];

  memcpy(message, payload, len);
  message[len] = 0;

  Serial.print("Publish received.");
  Serial.print("  message: ");
  Serial.println(message);
  set_led_status(message);
}

void set_led_status(char* status) {
  // không xử lý mess có chứa "check" vì đó là esp gửi, back mới xử lý thôi
  char kiem_tra[] = "check";
  if (strncmp(status, kiem_tra, strlen(kiem_tra)) != 0) {
    // Tách trạng thái của led_1
    char status1[2];
    strncpy(status1, status + 6, 1);
    status1[1] = '\0';

    // Tách trạng thái của led_2
    char status2[2];
    strncpy(status2, status + 14, 1);
    status2[1] = '\0';

    // gán
    led_1_status = strtol(status1, NULL, 10);
    led_2_status = strtol(status2, NULL, 10);

    doPubLed();
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  
  dht.begin();

  pinMode(led_1, OUTPUT);
  pinMode(led_2, OUTPUT);

  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  
  mqttClient.onPublish(onMqttPublish);
  
  mqttClient.onSubscribe(onMqttSubscribe);
  mqttClient.onUnsubscribe(onMqttUnsubscribe);
  mqttClient.onMessage(onMqttMessage);
  
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCredentials(MQTT_USERNAME, MQTT_PASSWORD);

  connectToWifi();
}

void loop() {
  
  if(led_1_status) digitalWrite(led_1, HIGH);
  else digitalWrite(led_1, LOW);   

  if(led_2_status) digitalWrite(led_2, HIGH);
  else digitalWrite(led_2, LOW); 

  if(bui >= 70){
    digitalWrite(led_1, LOW);
    digitalWrite(led_2, HIGH);
    delay(50);
    digitalWrite(led_1, HIGH);
    digitalWrite(led_2, LOW);
    delay(50);
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    light = analogRead(SENSOR_PIN);
    hum = dht.readHumidity();
    temp = dht.readTemperature();
    bui = rand() % 100 + 1;
  
    doPubDHT();
  }
}
