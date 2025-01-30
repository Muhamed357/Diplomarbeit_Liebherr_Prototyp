package com.liebherr.backend.repositories;

import com.liebherr.backend.entities.MachineCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MachineCardRepository extends JpaRepository<MachineCard, Integer> {
    List<MachineCard> findByProductSerialNo(String productSerialNo);
    List<MachineCard> findByProductSerialNoAndItemId(String productSerialNo, String itemId);
    List<MachineCard> findByProductSerialNoAndMachineCardVersion(String productSerialNo, String machineCardVersion);

    List<MachineCard> findByProductSerialNoAndMachineCardVersionAndItemId(String productSerialNo, String machineCardVersion, String itemId);

    List<MachineCard> findByProductSerialNoAndMachineCardVersionAndItemIdAndId(String productSerialNo, String machineCardVersion, String itemId, Integer Id);
}
