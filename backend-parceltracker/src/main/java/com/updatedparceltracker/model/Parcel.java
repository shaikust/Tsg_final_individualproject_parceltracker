package com.updatedparceltracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "parcel",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"parcelId"})})
public class Parcel {
  @Id
    @Column(name = "parcelId")
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Integer id;
  private String senderLocation;
  private String receiverLocation;
  private String createdBy;
  private String deliveryStatus;

}
