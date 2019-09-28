# node_数据库搭建和环境使用步骤


## 18. mysql 环境 安装

### 18.1 mysql 官网下载 mysql service 安装包

### 18.2 安装

### 18.3 安装完事之后 终端指令 不能识别 myql 指令

### 18.4 打开终端, 进入最上层文件夹 ~

### 18.5 vim .bash_profile

#### 解释

- vim xxx: 

	- 1. 当xxx 不存在, 创建新的

	- 2. 如果 xxx 存在, 则直接打开并进入

### 18.6 进入 .bash_profile 的编辑状态, 

#### 按键盘上的 I 键 进入编辑状态

### 18.7 写一个导出mysql的指令

#### export PATH=$PATH:/usr/local/mysql/bin

### 18.8 .bash_profile 是 MAC 系统上的终端指令文件

#### 在这个文件新加一条指令的话, 是不会立即生效的, 

#### 需要在终端执行 source .bash_profile

#### 才可以让新写入的指令生效

## 19. 操作mysql环境

### 19.1 进入mysql

#### $: mysql -u root -p

- 退出 mysql 环境

	- exit;

### 19.2 显示数据库(所有sql语句记得加;)

#### $: show databases;

### 19.3 创建数据库 school

#### $: create database school;

### 19.4 使用数据库 school

#### $: use school;

### 19.5表格 

#### create table 表格名 (字段1 字段的修饰,字段2 字段的修饰);

#### 一个字段后面可以跟上 多个字段修饰

#### 创建 info 表

- $: create table info (id int auto_increment primary key,name varchar(20) unique,birth date, addr varchar(40),major varchar(20),mail varchar(20), phone varchar(11),hobby varchar(50));

#### 创建 course 表

- $: create table course (course_id int primary key auto_increment, course_name varchar(20) , time date , grades int , pingjia varchar(50) id int , foreign key(id) references info (id) );

#### 删除数据库

- $: drop database school;

#### 删除表格

- $: drop table info;

#### 显示表格

- $: desc info;

#### 在表格中插入数据

- $: insert into info (name , age) values (‘zhangsan’ , 12);

#### 显示表中的数据

- $: select * from table;

	- 无条件显示表中的所有字段

- $: select name from table;

	- 无添加你显示表中的name字段

- $: select * from table where id=1;

	- 按照一定的条件显示表中的所有字段

- $: select name,age from table where id=1;

	- 按照一定条件显示表中的name 和 age字段

#### 修改表格字段编码为中文

- $: ALTER TABLE tb_chat MODIFY COLUMN content VARCHAR(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

#### 删除数据

- $: delete from info where name = ‘xxx’;

	- 按照一定的条件删除

- $: delete from info

	- 直接删除info表格中的所有数据

#### 更改数据

- $: update info name=‘lisi’, age=32 where id=1

