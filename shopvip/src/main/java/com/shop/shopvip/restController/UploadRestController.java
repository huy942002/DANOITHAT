package com.shop.shopvip.restController;

import com.shop.shopvip.repositories.irepo.UploadService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadRestController {
    @Autowired
    UploadService uploadService;
    @GetMapping("/public/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = uploadService.load(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @PostMapping("/api/admin/upload")
    public ResponseEntity<?> upload(@PathParam("file") MultipartFile file) {
        String time = String.valueOf(System.currentTimeMillis());
        uploadService.save(file,time);
        return ResponseEntity.ok(time);
    }
}
