package com.liebherr.backend.mappers;

import com.liebherr.backend.dtos.MachineCardDto;
import com.liebherr.backend.entities.MachineCardTwo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MachineCardTwoMapper {
    MachineCardDto toDto(MachineCardTwo machineCardTwo);
    MachineCardTwo toEntity(MachineCardDto machineCardDto);
}
