package com.liebherr.backend.mappers;

import com.liebherr.backend.dtos.MachineCardDto;
import com.liebherr.backend.entities.MachineCard;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MachineCardMapper {
    MachineCardDto toDto(MachineCard machineCard);
    MachineCard toEntity(MachineCardDto machineCardDto);
}