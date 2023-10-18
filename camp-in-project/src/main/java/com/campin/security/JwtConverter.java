package com.campin.security;

import com.campin.models.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtConverter {
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final String ISSUER = "camp-in";
    private final int EXPIRATION_MINUTES = 15;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(AppUser appUser){
        List<String> authorities = appUser.getAuthorities().stream()
                .map(r -> r.getAuthority()).toList();

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(appUser.getUsername())
                .claim("authorities", authorities)
                .claim("user_id", appUser.getAppUserId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public AppUser getAppUserFromToken(String token){
        if(token == null || !token.startsWith("Bearer")){
            return null;
        }

        try{
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();
            int userId = jws.getBody().get("user_id", Integer.class);
            List<String> authorities = jws.getBody().get("authorities", List.class);

            return new AppUser(userId, username, null, true, authorities);

        }catch (JwtException e){
            e.printStackTrace();
        }

        return null;
    }
}
