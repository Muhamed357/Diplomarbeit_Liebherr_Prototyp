package com.liebherr.backend.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.liebherr.backend.dtos.MachineCardDto;
import com.liebherr.backend.entities.MachineCard;
import com.liebherr.backend.entities.MachineCardTwo;
import com.liebherr.backend.mappers.MachineCardMapper;
import com.liebherr.backend.mappers.MachineCardTwoMapper;
import com.liebherr.backend.repositories.MachineCardRepository;
import com.liebherr.backend.repositories.MachineCardTwoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.Authentication;

import java.util.*;

class MachineCardServiceTest {

    @Mock private MachineCardRepository machineCardRepository;
    @Mock private MachineCardTwoRepository machineCardTwoRepository;
    @Mock private MachineCardMapper machineCardMapper;
    @Mock private MachineCardTwoMapper machineCardTwoMapper;
    @Mock private Authentication authentication;

    private MachineCardService machineCardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        machineCardService = new MachineCardService(
                machineCardRepository,
                machineCardTwoRepository,
                machineCardMapper,
                machineCardTwoMapper
        );
    }

    @Test
    void testGetAllMachineCards() {
        MachineCard machineCard = new MachineCard();
        machineCard.setProductSerialNo("1234");
        MachineCardDto machineCardDto = new MachineCardDto();

        MachineCardTwo machineCardTwo = new MachineCardTwo();
        machineCardTwo.setProductSerialNo("5678");
        MachineCardDto machineCardTwoDto = new MachineCardDto();

        when(machineCardRepository.findAll()).thenReturn(Collections.singletonList(machineCard));
        when(machineCardTwoRepository.findAll()).thenReturn(Collections.singletonList(machineCardTwo));
        when(machineCardMapper.toDto(machineCard)).thenReturn(machineCardDto);
        when(machineCardTwoMapper.toDto(machineCardTwo)).thenReturn(machineCardTwoDto);

        List<MachineCardDto> result = machineCardService.getAllMachineCards();

        assertEquals(2, result.size());
        verify(machineCardRepository).findAll();
        verify(machineCardTwoRepository).findAll();
    }

    @Test
    void testGetMachineCardById() {
        MachineCard machineCard = new MachineCard();
        machineCard.setId(1);
        MachineCardDto machineCardDto = new MachineCardDto();

        when(machineCardRepository.findById(1)).thenReturn(Optional.of(machineCard));
        when(machineCardMapper.toDto(machineCard)).thenReturn(machineCardDto);

        MachineCardDto result = machineCardService.getMachineCardById(1);

        assertNotNull(result);
        verify(machineCardRepository).findById(1);
    }

    @Test
    void testGetMachineCardByIdNotFound() {
        when(machineCardRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> machineCardService.getMachineCardById(1));

        assertEquals("MachineCard not found", exception.getMessage());
    }

    @Test
    void testGetMachineCardsByProductSerialNo() {
        String serialNo = "1234";
        MachineCard machineCard = new MachineCard();
        machineCard.setProductSerialNo(serialNo);
        MachineCardDto machineCardDto = new MachineCardDto();

        MachineCardTwo machineCardTwo = new MachineCardTwo();
        machineCardTwo.setProductSerialNo(serialNo);
        MachineCardDto machineCardTwoDto = new MachineCardDto();

        when(machineCardRepository.findByProductSerialNo(serialNo)).thenReturn(Collections.singletonList(machineCard));
        when(machineCardTwoRepository.findByProductSerialNo(serialNo)).thenReturn(Collections.singletonList(machineCardTwo));
        when(machineCardMapper.toDto(machineCard)).thenReturn(machineCardDto);
        when(machineCardTwoMapper.toDto(machineCardTwo)).thenReturn(machineCardTwoDto);

        List<MachineCardDto> result = machineCardService.getMachineCardsByProductSerialNo(serialNo);

        assertEquals(2, result.size());
    }


    @Test
    void testGetHighestMachineCardVersion() {
        String productSerialNo = "1234";
        String itemId = "A123";

        MachineCard machineCard = new MachineCard();
        machineCard.setMachineCardVersion("1");

        MachineCardTwo machineCardTwo = new MachineCardTwo();
        machineCardTwo.setMachineCardVersion("2");

        when(machineCardRepository.findByProductSerialNoAndItemId(productSerialNo, itemId)).thenReturn(Collections.singletonList(machineCard));
        when(machineCardTwoRepository.findByProductSerialNoAndItemId(productSerialNo, itemId)).thenReturn(Collections.singletonList(machineCardTwo));

        Integer result = machineCardService.getHighestMachineCardVersion(productSerialNo, itemId);

        assertEquals(2, result);
    }
}
