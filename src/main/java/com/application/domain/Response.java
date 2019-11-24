package com.application.domain;

import java.io.Serializable;

public class Response implements Serializable
{
String message;

  public Response (String message){
      super();
      this.message = message;
  }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
