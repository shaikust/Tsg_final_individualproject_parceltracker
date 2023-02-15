package com.updatedparceltracker.services;
import com.updatedparceltracker.exception.ResourceNotFoundException;
import com.updatedparceltracker.model.Parcel;
import com.updatedparceltracker.model.Tracking;
import com.updatedparceltracker.repository.ParcelRepository;
import com.updatedparceltracker.repository.TrackingRepository;
import com.updatedparceltracker.util.Validation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ParcelControllerService {
  final Logger logger= LoggerFactory.getLogger(ParcelControllerService.class);
@Autowired
  private  ParcelRepository parcelRepository;
@Autowired
private  TrackingRepository trackingRepository;
public ResponseEntity<List<Parcel>> getAllParcel(){
  try {
    return  ResponseEntity.ok(parcelRepository.findAll());

  }catch (Exception e){
    logger.error("access denaied for user");
    throw new AccessDeniedException("no access");
  }
}
  public ResponseEntity<String> addParcel(Parcel parcel) {

    parcelRepository.save(parcel);
    Tracking tracking=new Tracking();
    tracking.setParcel(parcel);
    tracking.setCurrentLocation(parcel.getSenderLocation());
    trackingRepository.save(tracking);
    logger.info("new parcel added with id:{}",parcel.getId());
    return new ResponseEntity<String>("["+parcel.getId()+"]"+"parcel added successfully",HttpStatus.OK);


  }
  public  ResponseEntity<Tracking> getParcel(Integer trackingId) {
    logger.info("get parcel details with id:{}",trackingId);
    Tracking tracking=this.trackingRepository.findById(trackingId).orElseThrow(()->new ResourceNotFoundException("Parcel","id",trackingId));
    return ResponseEntity.ok(tracking);
  }
public ResponseEntity<String> updateParcel(Integer trackingId, Parcel parcel) {
  try {
    Tracking tracking1=trackingRepository.findByparcelId(trackingId).orElseThrow(()->new UsernameNotFoundException("Parcel "+"with Id "+trackingId+"not found"));
    tracking1.setCurrentLocation(parcel.getSenderLocation());
    trackingRepository.save(tracking1);
    Parcel parcel1=parcelRepository.findById(trackingId).orElseThrow(()->new UsernameNotFoundException("Parcel "+"with parcelId "+trackingId+"not found"));
    parcel1.setDeliveryStatus(parcel.getDeliveryStatus());
    parcelRepository.save(parcel1);
    logger.info("updated parcel with id {} successfully",trackingId);
    return new ResponseEntity<String>("parcel "+"["+trackingId+"]"+"updated successfully", HttpStatus.OK);
  }catch (Exception e){
    logger.error("access is denaied for user");
    return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);

  }
}
  public ResponseEntity<String> deleteParcel(Integer trackingId) {
    try {
      if (Validation.isBlank(trackingId)) {
        logger.error("course id is empty");
        throw new IllegalArgumentException("course id should not be empty");
      }
      Tracking tracking=trackingRepository.findByparcelId(trackingId).orElseThrow(()->new ResourceNotFoundException("parcel","Id",trackingId));
      trackingRepository.delete(tracking);
      Parcel parcel=parcelRepository.findById(trackingId).orElseThrow(()->new ResourceNotFoundException("parcel","parcelId",trackingId));
      parcelRepository.delete(parcel);
      logger.info("parcel deleted with given id:{}",trackingId);
    return new ResponseEntity<>("parcel "+"["+trackingId+"]"+"deleted successfully",HttpStatus.OK);

    }catch (Exception e){
      logger.error("access denaied for user");
      return  new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);

    }
  }


}
