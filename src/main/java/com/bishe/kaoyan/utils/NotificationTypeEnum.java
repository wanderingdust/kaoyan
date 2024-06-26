package com.bishe.kaoyan.utils;

public enum NotificationTypeEnum {
    REPLY_QUESTION(1, "回复了文章"),
    REPLY_COMMENT(2, "回复了评论"),
    REPORT_QUESTION(3,"举报了文章");

    private int type;
    private String name;

    public int getType(){
        return type;
    }

    public String getName(){
        return name;
    }

    NotificationTypeEnum(int type, String name){
        this.type = type;
        this.name = name;
    }

    //获取名称
    public static String nameOfType(int type){
        for (NotificationTypeEnum notificationTypeEnum : NotificationTypeEnum.values()){
            if (notificationTypeEnum.getType() == type){
                return notificationTypeEnum.getName();
            }
        }
        return "";
    }
}
