package com.application.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil implements Serializable {
    static final String CLAM_KEY_USERNAME = "sub";
    static final String CLAM_KEY_AUDIENCE = "audience";
    static final String CLAM_KEY_CREATED = "created";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String getUsernameFromToken(String authToken) {
        String username = null;
        try {
            final Claims claims = getClaimsFromToken(authToken);
            username = claims.getSubject();
        } catch (Exception ex) {
            username = null;
        }
        return null;
    }

    private Claims getClaimsFromToken(String authToken) {
        Claims claims = null;
        try {
            claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken).getBody();
        } catch (Exception ex) {
            claims = null;
        }
        return claims;
    }

    public boolean validateToken(String authToken, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        final String username = getUsernameFromToken(authToken);
        return (username.equals(user.getUsername()) && !isTokenExpired(authToken));
    }

    private boolean isTokenExpired(String authToken) {
        final Date expiration = getExpirationDateFromToken(authToken);
        return expiration.before(new Date());

    }

    private Date getExpirationDateFromToken(String authToken) {
        Date expiration = null;
        try {
            final Claims claims = getClaimsFromToken(authToken);
            if (claims != null) {
                expiration = claims.getExpiration();
            } else {
                expiration = null;
            }
        } catch (Exception ex) {
            expiration = null;
        }
        return expiration;
    }

    public String generateToken(JwtUser userDetails) {
        Map<String,Object> claims = new HashMap<>();
        claims.put(CLAM_KEY_USERNAME,userDetails.getUsername());
        claims.put(CLAM_KEY_CREATED,new Date());
        return generateToken(claims);
    }
    private String generateToken(Map<String,Object> claims){
        return Jwts.builder().setClaims(claims).setExpiration(generateExpirationDate()).signWith(SignatureAlgorithm.HS512,secret).compact();
    }

    private Date generateExpirationDate() {
    return new Date(System.currentTimeMillis()+expiration *1000);
    }


}
