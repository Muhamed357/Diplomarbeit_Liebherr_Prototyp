package com.liebherr.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MachineCardDto {
    private int id;
    private String companyId;
    private String productSerialNo;
    private String machineCardVersion;
    private String component;
    private String itemId;
    private String itemDescription;
    private String itemClassificationId;
    private String assemblyGroup;
    private String assemblyGroupDescription;
    private String zbq;
    private String position;
    private String sequenceNumber;
    private String serialNumber;
    private String zar;
    private String quantity;
    private Date entryDate;
    private Date replacementDate;
    private String etSheet;
    private String isLmb;
    private String changedBy;
}
