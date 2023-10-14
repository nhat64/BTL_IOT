CREATE SCHEMA `btliot` ;

CREATE TABLE `btliot`.`device` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_device` VARCHAR(45) NOT NULL,
  `status_device` INT NOT NULL,
  `time_device` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
  
select * from `btliot`.`device`;
INSERT INTO `btliot`.`device` (`name_device`, `status_device`, `time_device`) VALUES ('led_1', '1', '2023-09-25 10:19:10');


CREATE TABLE `btliot`.`data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `temperature` FLOAT NOT NULL,
  `humidity` FLOAT NOT NULL,
  `light` FLOAT NOT NULL,
  `bui` FLOAT NOT NULL,
  `time_data` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
  
select * from `btliot`.`data`
where humidity = 72 and bui > 80;

select * from `btliot`.`data`
where humidity > 50
order by temperature desc limit 5; 

select * from `btliot`.`data`;
INSERT INTO `btliot`.`data` (`temperature`, `humidity`, `light`, `time_data`) VALUES ('33.00', '78', '500', '2023-09-25 10:19:10');