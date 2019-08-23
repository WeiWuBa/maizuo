# 卖座电影

#### 路由定义

一级路由：

| 路径          | 组件名 |
| ------------- | ------ |
| /             | Home   |
| /film/:filmId | Film   |
| /city         | City   |
| /login        | Login  |
| /money        | Money  |

二级路由：

| 路径     | 组件名  | 他的父级 |
| -------- | ------- | -------- |
| /films   | Films   | /        |
| /cinemas | Cinemas | /        |
| /center  | Center  | /        |
