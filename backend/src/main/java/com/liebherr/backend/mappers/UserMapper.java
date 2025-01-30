package com.liebherr.backend.mappers;

import com.liebherr.backend.dtos.SignUpDto;
import com.liebherr.backend.dtos.UserDto;
import com.liebherr.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}