package com.liebherr.backend.services;

import com.liebherr.backend.dtos.CredentialsDto;
import com.liebherr.backend.dtos.SignUpDto;
import com.liebherr.backend.dtos.UserDto;
import com.liebherr.backend.entities.User;
import com.liebherr.backend.exceptions.AppException;
import com.liebherr.backend.mappers.UserMapper;
import com.liebherr.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.CharBuffer;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    private User user;
    private SignUpDto signUpDto;
    private CredentialsDto credentialsDto;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("testuser");
        user.setPassword("encodedPassword");

        signUpDto = new SignUpDto();
        signUpDto.setEmail("testuser");
        signUpDto.setPassword("password".toCharArray());

        credentialsDto = new CredentialsDto();
        credentialsDto.setEmail("testuser");
        credentialsDto.setPassword("password".toCharArray());


        userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("testuser");
    }

    @Test
    void testLogin_Success() {
        // Arrange
        when(userRepository.findByEmail("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())).thenReturn(true);
        when(userMapper.toUserDto(user)).thenReturn(userDto);

        // Act
        UserDto result = userService.login(credentialsDto);

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getEmail());
        verify(userRepository, times(1)).findByEmail("testuser");
        verify(passwordEncoder, times(1)).matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword());
        verify(userMapper, times(1)).toUserDto(user);
    }


    @Test
    void testLogin_InvalidPassword() {
        // Arrange
        when(userRepository.findByEmail("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())).thenReturn(false);

        // Act & Assert
        AppException exception = assertThrows(AppException.class, () -> userService.login(credentialsDto));
        assertEquals("Invalid password", exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void testRegister_Success() {
        // Arrange
        when(userRepository.findByEmail("testuser")).thenReturn(Optional.empty());
        when(userMapper.signUpToUser(signUpDto)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userMapper.toUserDto(user)).thenReturn(userDto);

        // Act
        UserDto result = userService.register(signUpDto);

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getEmail());
        verify(userRepository, times(1)).findByEmail("testuser");
        verify(userMapper, times(1)).signUpToUser(signUpDto);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testRegister_LoginAlreadyExists() {
        // Arrange
        when(userRepository.findByEmail("testuser")).thenReturn(Optional.of(user));

        // Act & Assert
        AppException exception = assertThrows(AppException.class, () -> userService.register(signUpDto));
        assertEquals("Login already exists", exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void testFindByLogin_Success() {
        // Arrange
        when(userRepository.findByEmail("testuser")).thenReturn(Optional.of(user));
        when(userMapper.toUserDto(user)).thenReturn(userDto);

        // Act
        UserDto result = userService.findByEmail("testuser");

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getEmail());
        verify(userRepository, times(1)).findByEmail("testuser");
        verify(userMapper, times(1)).toUserDto(user);
    }

    @Test
    void testFindByLogin_UnknownUser() {
        // Arrange
        when(userRepository.findByEmail("unknown")).thenReturn(Optional.empty());

        // Act & Assert
        AppException exception = assertThrows(AppException.class, () -> userService.findByEmail("unknown"));
        assertEquals("Unknown user", exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
