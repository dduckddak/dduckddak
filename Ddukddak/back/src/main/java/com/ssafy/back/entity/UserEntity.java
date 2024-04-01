package com.ssafy.back.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.back.auth.dto.request.SignUpRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_seq", nullable = false)
	private Integer userSeq;

	@Column(name = "user_name", nullable = false, length = 20)
	private String userName;

	@Column(name = "sex", nullable = false, length = 2)
	private String sex;

	@Column(name = "birth", nullable = false)
	private Integer birth;

	@Column(name = "user_id", nullable = false, unique = true, length = 20)
	private String userId;

	@Column(name = "user_password", nullable = false, length = 255)
	private String userPassword;

	@Column(name = "first_login", nullable = false)
	private Boolean firstLogin;

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<VoiceEntity> voiceEntities = new ArrayList<>();

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<ColoringEntity> ColoringEntities = new ArrayList<>();

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<MakeBookEntity> MakeBookEntities = new ArrayList<>();

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<PhotoEntity> PhotoEntities = new ArrayList<>();

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<ReviewEntity> ReviewEntities = new ArrayList<>();

	public UserEntity(SignUpRequestDto dto) {
		this.userName = dto.getUserName();
		this.sex = dto.getSex();
		this.birth = dto.getBirth();
		this.userId = dto.getUserId();
		this.userPassword = dto.getUserPassword();
		this.firstLogin = true;
	}
}
