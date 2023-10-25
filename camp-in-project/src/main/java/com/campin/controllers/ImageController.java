package com.campin.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    @PostMapping("/upload")
    public ResponseEntity<HashMap<String, String>> upload(MultipartFile file){
        try{
            S3Client s3 = S3Client
                    .builder()
                    .region(Region.US_EAST_1)
                    .build();

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket("campen-joy-bucket")
                    .key(file.getOriginalFilename())
                    .build();

            GetUrlRequest urlRequest = GetUrlRequest.builder()
                    .bucket("campen-joy-bucket")
                    .key(file.getOriginalFilename())
                    .build();

            URL url = s3.utilities().getUrl(urlRequest);
            System.out.println("The URL for  "+ file.getOriginalFilename() +" is "+ url);

            HashMap<String, String> urlMap = new HashMap<>();
            urlMap.put("url", url.toString());

            PutObjectResponse response = s3.putObject(request, RequestBody.fromBytes(file.getBytes()));

            return new ResponseEntity<>(urlMap, HttpStatus.CREATED);
        }catch(IOException e){
            System.err.println(e.getMessage());
        }
        return new ResponseEntity(null, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
