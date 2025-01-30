package com.liebherr.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MachineCardRequest {
    // Getter und Setter
    private MachineCardDto machineCardDto;
    private CredentialsDto credentialsDto;

}