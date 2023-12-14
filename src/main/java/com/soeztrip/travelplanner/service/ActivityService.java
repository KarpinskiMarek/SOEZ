package com.soeztrip.travelplanner.service;

import com.soeztrip.travelplanner.repository.ActivityRepository;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    private ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }
}
