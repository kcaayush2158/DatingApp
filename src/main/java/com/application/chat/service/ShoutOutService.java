package com.application.chat.service;

import com.application.chat.model.ShoutOut;
import com.application.chat.repository.ShoutOutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoutOutService {
    @Autowired
    private ShoutOutRepository shoutOutRepository;

    public List<ShoutOut> getAllShoutOuts() {
        return shoutOutRepository.getAllShoutOuts();
    }

    public ShoutOut saveShoutOuts(ShoutOut shoutOut){
        return  shoutOutRepository.save(shoutOut);
    }

    public void deleteShoutOuts(int id){
         shoutOutRepository.deleteById(id);
    }





}
