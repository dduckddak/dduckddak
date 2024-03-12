package com.ssafy.back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "voice")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id", nullable = false)
    private Integer voiceId;

    @ManyToOne
    @JoinColumn(name="user_seq")
    UserEntity userEntity;

    @Column(name = "voice_name", nullable = false, length = 20)
    private String voiceName;

    @Column(name = "voice_model_id", nullable = false, length = 40)
    private String voiceModelId;

}
