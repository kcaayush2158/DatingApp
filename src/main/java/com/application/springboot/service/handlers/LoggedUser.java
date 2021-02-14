package com.application.springboot.service.handlers;

import com.application.springboot.model.userstore.ActiveUserStore;
import lombok.Data;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpSessionBindingListener;
import java.util.List;

@Component
@Data
public class LoggedUser implements HttpSessionBindingListener {
    private String username;
    private ActiveUserStore activeUserStore;

    public LoggedUser(String username, ActiveUserStore activeUserStore) {
        this.username = username;
        this.activeUserStore = activeUserStore;
    }

    public LoggedUser() {
    }

    @Override
    public void valueBound(javax.servlet.http.HttpSessionBindingEvent event) {
        List<String> users = activeUserStore.getUsers();
        LoggedUser user =(LoggedUser) event.getValue();
        if(!users.contains(user.getUsername())){
            users.add(user.getUsername());
        }

    }
    @Override
    public void valueUnbound(javax.servlet.http.HttpSessionBindingEvent event) {
        List<String> users= activeUserStore.getUsers();
       LoggedUser user= (LoggedUser) event.getValue();
        users.remove(user.getUsername());
        }
}

