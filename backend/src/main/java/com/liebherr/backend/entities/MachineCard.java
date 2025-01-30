package com.liebherr.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "machine_data")
public class MachineCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "company_id", length = 8)
    private String companyId;

    @Column(name = "product_serial_no", length = 16)
    private String productSerialNo;

    @Column(name = "machine_card_version", length = 8)
    private String machineCardVersion;

    @Column(name = "component", length = 8)
    private String component;

    @Column(name = "item_id", length = 16)
    private String itemId;

    @Column(name = "item_description", length = 64)
    private String itemDescription;

    @Column(name = "item_classification_id", length = 16)
    private String itemClassificationId;

    @Column(name = "assembly_group", length = 16)
    private String assemblyGroup;

    @Column(name = "assembly_group_description", length = 64)
    private String assemblyGroupDescription;

    @Column(name = "zbq", length = 8)
    private String zbq;

    @Column(name = "position", length = 8)
    private String position;

    @Column(name = "sequence_number", length = 8)
    private String sequenceNumber;

    @Column(name = "serial_number", length = 64)
    private String serialNumber;

    @Column(name = "zar", length = 8)
    private String zar;

    @Column(name = "quantity", length = 8)
    private String quantity;

    @Column(name = "entry_date")
    @Temporal(TemporalType.DATE)
    private Date entryDate;

    @Column(name = "replacement_date")
    @Temporal(TemporalType.DATE)
    private Date replacementDate;

    @Column(name = "et_sheet", length = 8)
    private String etSheet;

    @Column(name = "is_lmb", length = 8)
    private String isLmb;
}
