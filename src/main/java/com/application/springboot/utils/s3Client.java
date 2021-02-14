package com.application.springboot.utils;

import com.amazonaws.AmazonServiceException;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;


public class s3Client {
    @Value("${bucketName}")
    private String bucketName;
    @Value("${endpointUrl}")
    private String endPointurl;
    @Value("${ACCESS-KEY}")
    private String accessKey;
    @Value("${SECRET-KEY}")
    private String secretKey;
    public static void main(String[] args) throws  Exception{


    }


}
