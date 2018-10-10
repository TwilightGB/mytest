package com.company.test.dto;

import java.io.Serializable;

public class CommonDto<T> implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	/** 成功编码  **/
	public static final int CODE_SUCCESS = 1;
	/** 失败编码  **/
	public static final int CODE_FAIL = -1;
	
	/** 异常编码  **/
	public static final int CODE_EXCEPTION = 0;
	/** 正常编码  **/
	public static final int CODE_NORMAL = 1;
	/** 警告编码  **/
	public static final int CODE_WARN = 2;
	
	private T data;
	
	private int code;
	
	private String message;
	
	public CommonDto(){
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}

