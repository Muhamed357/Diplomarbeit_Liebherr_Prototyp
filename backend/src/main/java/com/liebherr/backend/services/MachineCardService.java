package com.liebherr.backend.services;

import com.liebherr.backend.dtos.MachineCardDto;
import com.liebherr.backend.dtos.UserDto;
import com.liebherr.backend.entities.MachineCard;
import com.liebherr.backend.entities.MachineCardTwo;
import com.liebherr.backend.mappers.MachineCardMapper;
import com.liebherr.backend.mappers.MachineCardTwoMapper;
import com.liebherr.backend.repositories.MachineCardRepository;
import com.liebherr.backend.repositories.MachineCardTwoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class MachineCardService {

    private final MachineCardRepository machineCardRepository;
    private final MachineCardTwoRepository machineCardTwoRepository;
    private final MachineCardMapper machineCardMapper;
    private final MachineCardTwoMapper machineCardTwoMapper;

    public List<MachineCardDto> getAllMachineCards() {
        List<MachineCardDto> machineCards = machineCardRepository.findAll()
                .stream()
                .map(machineCardMapper::toDto)
                .toList();

        List<MachineCardDto> machineCardTwos = machineCardTwoRepository.findAll()
                .stream()
                .map(machineCardTwoMapper::toDto)
                .toList();

        return Stream.concat(machineCards.stream(), machineCardTwos.stream())
                .collect(Collectors.toList());
    }

    public MachineCardDto getMachineCardById(int id) {
        MachineCard machineCard = machineCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("MachineCard not found"));
        return machineCardMapper.toDto(machineCard);
    }

    public List<MachineCardDto> getMachineCardsByProductSerialNo(String productSerialNo) {
        List<MachineCardDto> machineCards = machineCardRepository.findByProductSerialNo(productSerialNo)
                .stream()
                .map(machineCardMapper::toDto)
                .toList();

        List<MachineCardDto> machineCardTwos = machineCardTwoRepository.findByProductSerialNo(productSerialNo)
                .stream()
                .map(machineCardTwoMapper::toDto)
                .toList();

        return Stream.concat(machineCards.stream(), machineCardTwos.stream())
                .collect(Collectors.toList());
    }

    public List<MachineCardDto> getMachineCardsByProductSerialNoAndVersion(String productSerialNo, String version) {
        List<MachineCardDto> machineCards = machineCardRepository.findByProductSerialNoAndMachineCardVersion(productSerialNo, version)
                .stream()
                .map(machineCardMapper::toDto)
                .toList();

        List<MachineCardDto> machineCardTwos = machineCardTwoRepository.findByProductSerialNoAndMachineCardVersion(productSerialNo, version)
                .stream()
                .map(machineCardTwoMapper::toDto)
                .toList();

        return Stream.concat(machineCards.stream(), machineCardTwos.stream())
                .collect(Collectors.toList());
    }

    public List<MachineCardDto> getMachineCardsByProductSerialNoAndVersionAndItemId(String productSerialNo, String version, String itemId) {
        List<MachineCardDto> machineCards = machineCardRepository.findByProductSerialNoAndMachineCardVersionAndItemId(productSerialNo, version, itemId)
                .stream()
                .map(machineCardMapper::toDto)
                .toList();

        List<MachineCardDto> machineCardTwos = machineCardTwoRepository.findByProductSerialNoAndMachineCardVersionAndItemId(productSerialNo, version, itemId)
                .stream()
                .map(machineCardTwoMapper::toDto)
                .toList();

        return Stream.concat(machineCards.stream(), machineCardTwos.stream())
                .collect(Collectors.toList());
    }

    public List<MachineCardDto> getMachineCardsByChangedBy(String changedBy) {
        List<MachineCardTwo> machineCards = machineCardTwoRepository.findByChangedBy(changedBy);
        if (machineCards.isEmpty()) {
            throw new RuntimeException("MachineCards not found");
        }
        return machineCards.stream()
                .map(machineCardTwoMapper::toDto)
                .collect(Collectors.toList());
    }





    public Integer getHighestMachineCardVersion(String productSerialNo, String itemId) {
        List<MachineCard> allMachineCards = machineCardRepository.findByProductSerialNoAndItemId(productSerialNo, itemId);
        List<MachineCardTwo> allMachineCardTwos = machineCardTwoRepository.findByProductSerialNoAndItemId(productSerialNo, itemId);

        return Stream.concat(
                        allMachineCards.stream().map(machineCard -> parseVersionToInteger(machineCard.getMachineCardVersion())),
                        allMachineCardTwos.stream().map(machineCardTwo -> parseVersionToInteger(machineCardTwo.getMachineCardVersion()))
                )
                .max(Integer::compareTo)
                .orElse(0);
    }

    private Integer parseVersionToInteger(String version) {
        try {
            return Integer.parseInt(version);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public MachineCardDto createOrUpdateMachineCard(String productSerialNo, String version, String itemId, String serialNumber, MachineCardDto newMachineCardDto, Integer Id) {

        String changedBy = "System";

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDto user) {
                changedBy = user.getEmail();
            }
        }

        Integer highestVersion = getHighestMachineCardVersion(productSerialNo, itemId);
        Integer newVersion = parseVersionToInteger(version);

        // Versuche, den existierenden Datensatz in MachineCardTwo zu finden
        List<MachineCardTwo> existingMachineCardTwoOptional = machineCardTwoRepository.findByProductSerialNoAndMachineCardVersionAndItemIdAndId(productSerialNo, version, itemId, Id);

        if (existingMachineCardTwoOptional.size() == 1) {
            // Datensatz existiert bereits in MachineCardTwo, aktualisiere ihn
            MachineCardTwo existingMachineCardTwo = existingMachineCardTwoOptional.get(0);
            existingMachineCardTwo.setChangedBy(changedBy);
            existingMachineCardTwo.setItemId(itemId);
            existingMachineCardTwo.setMachineCardVersion(version);
            existingMachineCardTwo.setProductSerialNo(productSerialNo);
            existingMachineCardTwo.setSerialNumber(serialNumber);
            existingMachineCardTwo.setAssemblyGroup(newMachineCardDto.getAssemblyGroup());
            existingMachineCardTwo.setAssemblyGroupDescription(newMachineCardDto.getAssemblyGroupDescription());
            existingMachineCardTwo.setCompanyId(newMachineCardDto.getCompanyId());
            existingMachineCardTwo.setComponent(newMachineCardDto.getComponent());
            existingMachineCardTwo.setEntryDate(newMachineCardDto.getEntryDate());
            existingMachineCardTwo.setEtSheet(newMachineCardDto.getEtSheet());
            existingMachineCardTwo.setIsLmb(newMachineCardDto.getIsLmb());
            existingMachineCardTwo.setItemClassificationId(newMachineCardDto.getItemClassificationId());
            existingMachineCardTwo.setItemDescription(newMachineCardDto.getItemDescription());
            existingMachineCardTwo.setPosition(newMachineCardDto.getPosition());
            existingMachineCardTwo.setQuantity(newMachineCardDto.getQuantity());
            existingMachineCardTwo.setReplacementDate(newMachineCardDto.getReplacementDate());
            existingMachineCardTwo.setSequenceNumber(newMachineCardDto.getSequenceNumber());
            //existingMachineCardTwo.setSerialNumber(newMachineCardDto.getSerialNumber());
            existingMachineCardTwo.setZar(newMachineCardDto.getZar());
            existingMachineCardTwo.setZbq(newMachineCardDto.getZbq());

            // Speichern der Änderungen
            existingMachineCardTwo = machineCardTwoRepository.save(existingMachineCardTwo);

            return machineCardTwoMapper.toDto(existingMachineCardTwo);
        } else if (newVersion > highestVersion) {
            // Neue Version ist größer als die höchste Version in MachineCardTwo
            // Erstelle einen neuen Datensatz in MachineCardTwo basierend auf den neuen Daten
            MachineCardTwo newMachineCardTwo = new MachineCardTwo();
            newMachineCardTwo.setChangedBy(changedBy);
            newMachineCardTwo.setItemId(itemId);
            newMachineCardTwo.setMachineCardVersion(version);
            newMachineCardTwo.setProductSerialNo(productSerialNo);
            newMachineCardTwo.setSerialNumber(serialNumber);
            newMachineCardTwo.setAssemblyGroup(newMachineCardDto.getAssemblyGroup());
            newMachineCardTwo.setAssemblyGroupDescription(newMachineCardDto.getAssemblyGroupDescription());
            newMachineCardTwo.setCompanyId(newMachineCardDto.getCompanyId());
            newMachineCardTwo.setComponent(newMachineCardDto.getComponent());
            newMachineCardTwo.setEntryDate(newMachineCardDto.getEntryDate());
            newMachineCardTwo.setEtSheet(newMachineCardDto.getEtSheet());
            newMachineCardTwo.setIsLmb(newMachineCardDto.getIsLmb());
            newMachineCardTwo.setItemClassificationId(newMachineCardDto.getItemClassificationId());
            newMachineCardTwo.setItemDescription(newMachineCardDto.getItemDescription());
            newMachineCardTwo.setPosition(newMachineCardDto.getPosition());
            newMachineCardTwo.setQuantity(newMachineCardDto.getQuantity());
            newMachineCardTwo.setReplacementDate(newMachineCardDto.getReplacementDate());
            newMachineCardTwo.setSequenceNumber(newMachineCardDto.getSequenceNumber());
            newMachineCardTwo.setZar(newMachineCardDto.getZar());
            newMachineCardTwo.setZbq(newMachineCardDto.getZbq());

            // Speichern des neuen Datensatzes
            newMachineCardTwo = machineCardTwoRepository.save(newMachineCardTwo);

            return machineCardTwoMapper.toDto(newMachineCardTwo);
        } else {
            // Neue Version ist kleiner oder gleich der höchsten Version, aber es gibt keinen Eintrag in MachineCardTwo
            // Kopiere den Datensatz aus MachineCard und speichere ihn in MachineCardTwo
            List<MachineCard> existingMachineCardOptional = machineCardRepository.findByProductSerialNoAndMachineCardVersionAndItemIdAndId(productSerialNo, version, itemId, Id);

            if (!existingMachineCardOptional.isEmpty()) {

                MachineCard existingMachineCard = existingMachineCardOptional.get(0);

                // Erstelle einen neuen Datensatz in MachineCardTwo mit den Daten von MachineCard
                MachineCardTwo newMachineCardTwo = new MachineCardTwo();
                newMachineCardTwo.setChangedBy(changedBy);
                newMachineCardTwo.setItemId(itemId);
                newMachineCardTwo.setMachineCardVersion(version);
                newMachineCardTwo.setProductSerialNo(productSerialNo);
                newMachineCardTwo.setSerialNumber(serialNumber);
                newMachineCardTwo.setAssemblyGroup(existingMachineCard.getAssemblyGroup());
                newMachineCardTwo.setAssemblyGroupDescription(existingMachineCard.getAssemblyGroupDescription());
                newMachineCardTwo.setCompanyId(existingMachineCard.getCompanyId());
                newMachineCardTwo.setComponent(existingMachineCard.getComponent());
                newMachineCardTwo.setEntryDate(existingMachineCard.getEntryDate());
                newMachineCardTwo.setEtSheet(existingMachineCard.getEtSheet());
                newMachineCardTwo.setIsLmb(existingMachineCard.getIsLmb());
                newMachineCardTwo.setItemClassificationId(existingMachineCard.getItemClassificationId());
                newMachineCardTwo.setItemDescription(existingMachineCard.getItemDescription());
                newMachineCardTwo.setPosition(existingMachineCard.getPosition());
                newMachineCardTwo.setQuantity(existingMachineCard.getQuantity());
                newMachineCardTwo.setReplacementDate(existingMachineCard.getReplacementDate());
                newMachineCardTwo.setSequenceNumber(existingMachineCard.getSequenceNumber());
                newMachineCardTwo.setZar(existingMachineCard.getZar());
                newMachineCardTwo.setZbq(existingMachineCard.getZbq());

                // Speichern des neuen Datensatzes in MachineCardTwo
                newMachineCardTwo = machineCardTwoRepository.save(newMachineCardTwo);

                return machineCardTwoMapper.toDto(newMachineCardTwo);
            } else {
                throw new RuntimeException("Kein entsprechender Datensatz in MachineCard gefunden. " +
                        "Überprüfen Sie die Eingaben: " +
                        "Product Serial No: " + productSerialNo + ", " +
                        "Version: " + version + ", " +
                        "Item ID: " + itemId + ", " +
                        "Serial Number: " + serialNumber);
            }
        }
    }

}
