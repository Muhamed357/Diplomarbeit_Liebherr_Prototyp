package com.liebherr.backend.repositories;

import com.liebherr.backend.entities.MachineCard;
import com.liebherr.backend.entities.MachineCardTwo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MachineCardTwoRepository extends JpaRepository<MachineCardTwo, Integer> {

    List<MachineCardTwo> findByProductSerialNo(String productSerialNo);
    List<MachineCardTwo> findByProductSerialNoAndItemId(String productSerialNo, String itemId);
    Optional<MachineCardTwo> findByProductSerialNoAndMachineCardVersion(String productSerialNo, String machineCardVersion);
    List<MachineCardTwo> findByProductSerialNoAndMachineCardVersionAndItemId(String productSerialNo, String machineCardVersion, String itemId);
    List<MachineCardTwo> findByProductSerialNoAndMachineCardVersionAndItemIdAndId(String productSerialNo, String machineCardVersion, String itemId, Integer Id);

    List<MachineCardTwo> findByChangedBy(String changedBy);

}
