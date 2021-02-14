package com.application.springboot.service.photo;

import com.application.springboot.model.Photos;
import com.application.springboot.model.User;
import com.application.springboot.repository.photostorage.PhotoStorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {

    @Autowired
    private PhotoStorageRepository photoStorageRepository;

    public Photos savePhotos(Photos photos){
    return  photoStorageRepository.save(photos);
    }

    public void deletePhotos(int id){
         photoStorageRepository.deleteById(id);
    }

    public List<Photos> showAllPhotos(User user){
        return photoStorageRepository.findAllByPrincipalName(user);
    }

    public int countAllPhotos(User user){
        return photoStorageRepository.countPhotosByPrincipalName(user);
    }

    public Photos updatePhoto(String photoUrl,int id){
        return photoStorageRepository.updatePhoto(photoUrl,id);
    }

    public void updateUserPhotos(String photoType , int id ){
         photoStorageRepository.updateUserPhoto(id,photoType);
    }

//    public int uploadPhotos(String url, String photoType, User user, String email){
//        return photoStorageRepository.uploadUserPhoto(url, photoType, user, email);
//    }


}
