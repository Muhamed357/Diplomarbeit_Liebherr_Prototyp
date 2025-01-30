package com.liebherr.backend.controllers;

import com.liebherr.backend.dtos.CredentialsDto;
import com.liebherr.backend.dtos.MachineCardDto;
import com.liebherr.backend.dtos.MachineCardRequest;
import com.liebherr.backend.dtos.UserDto;
import com.liebherr.backend.exceptions.AppException;
import com.liebherr.backend.services.MachineCardService;
import com.liebherr.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/machine-cards")
public class MachineCardController {

    private final MachineCardService machineCardService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<MachineCardDto>> getAllMachineCards() {
        List<MachineCardDto> machineCards = machineCardService.getAllMachineCards();
        return ResponseEntity.ok(machineCards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MachineCardDto> getMachineCardById(@PathVariable int id) {
        MachineCardDto machineCard = machineCardService.getMachineCardById(id);
        return ResponseEntity.ok(machineCard);
    }

    @GetMapping("/project-number/{projectNumber}")
    public ResponseEntity<List<MachineCardDto>> getMachineCardsByProjectNumber(@PathVariable String projectNumber) {
        List<MachineCardDto> machineCards = machineCardService.getMachineCardsByProductSerialNo(projectNumber);
        return ResponseEntity.ok(machineCards);
    }

    @GetMapping("/project-number/{projectNumber}/version/{version}")
    public ResponseEntity<List<MachineCardDto>> getMachineCardsByProjectNumberAndVersion(@PathVariable String projectNumber, @PathVariable String version) {
        List<MachineCardDto> machineCards = machineCardService.getMachineCardsByProductSerialNoAndVersion(projectNumber, version);
        return ResponseEntity.ok(machineCards);
    }

    @GetMapping("/project-number/{projectNumber}/version/{version}/item-id/{itemId}")
    public ResponseEntity<List<MachineCardDto>> getMachineCardsByProjectNumberAndVersionAndItemId(
            @PathVariable String projectNumber,
            @PathVariable String version,
            @PathVariable String itemId) {
        List<MachineCardDto> machineCards = machineCardService.getMachineCardsByProductSerialNoAndVersionAndItemId(projectNumber, version, itemId);
        return ResponseEntity.ok(machineCards);
    }

    @GetMapping("/changed-by/{changedBy}")
    public ResponseEntity<List<MachineCardDto>>getMachineCardsByChangedBy(
            @PathVariable String changedBy){
        List<MachineCardDto> machineCards = machineCardService.getMachineCardsByChangedBy(changedBy);
        return  ResponseEntity.ok(machineCards);
    }



    @PostMapping("/project-number/{projectNumber}/version/{version}/item-id/{itemId}/serial-number/{serialNumber}/id/{id}")
    public ResponseEntity<MachineCardDto> createMachineCard(
            @PathVariable String projectNumber,
            @PathVariable String version,
            @PathVariable String itemId,
            @PathVariable String serialNumber,
            @PathVariable Integer id,
            @RequestBody MachineCardDto newMachineCardDto) {


        MachineCardDto createdMachineCard = machineCardService.createOrUpdateMachineCard(
                projectNumber, version, itemId, serialNumber, newMachineCardDto,id);

        return ResponseEntity.ok(createdMachineCard);
    }


    @GetMapping("/project-number/{projectNumber}/item-id/{itemId}/highest-version")
    public ResponseEntity<Integer> getHighestVersion(@PathVariable String projectNumber,
                                                     @PathVariable String itemId) {
        Integer highestVersion = machineCardService.getHighestMachineCardVersion(projectNumber, itemId);
        return ResponseEntity.ok(highestVersion);
    }

}
