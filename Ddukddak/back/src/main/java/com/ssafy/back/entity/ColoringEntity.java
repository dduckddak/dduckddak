package com.ssafy.back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "coloring")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColoringEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coloring_id", nullable = false)
    private Integer coloringId;

    @ManyToOne
    @JoinColumn(name="user_seq", nullable = false)
    UserEntity userEntity;

}
