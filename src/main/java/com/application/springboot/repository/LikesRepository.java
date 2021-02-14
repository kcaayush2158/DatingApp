package com.application.springboot.repository;

import com.application.springboot.model.User;
import com.application.springboot.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikesRepository extends JpaRepository<Likes,Integer> {

    int countDistinctByLikedTo(User likedTo);

    int countDistinctByLikedBy(User likedBy);

    List<Likes> findDistinctByLikedTo(User likedTo);

    List<Likes> findDistinctByLikedBy(User likedBy);

    Likes findByLikedToAndLikedBy(User likedTo, User likedBy);

    int countAllByLikedByAndLikedTo(User likedBy, User likedTo);

    @Query("update Likes l set l.status = :status  where l.id=:id")
    Likes updatelikesStauts(@Param("id") int id,@Param("status") boolean status);

    int deleteById(int id);
}
