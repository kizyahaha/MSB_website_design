package com.kizy.executors;

import java.io.IOException;
import java.util.List;

import com.kizy.data.database.DatabaseUtils;
import com.kizy.data.rant.Rant;

public class RantDecayExecutor implements Runnable {

    private final static float RANT_DECAY_CONSTANT = .0000000133908f;

    @Override
    public void run() {
        //long start, end;
        //start = System.currentTimeMillis();
        //System.out.print("Decaying rants");
        try {
            List<Rant> rants = DatabaseUtils.getRants();
            long currentTime = System.currentTimeMillis();
            for (Rant rant : rants) {
                changePower(rant, currentTime);
                // This is commented out because of our time zone differences.
                // The rants are saved by the timezone they are made in, so we will
                // constantly conflict on the rants.txt file since my times will be
                // different from yours (10 PST vs 12 CST).
                //DatabaseUtils.modifyRant(rant.getRantId(), rant);
            }
        } catch (IOException e) {
            System.err.println("Could not read rants!");
            e.printStackTrace();
        }
        //end = System.currentTimeMillis();
        //System.out.println("Time for decay: " + (end - start) + "ms");
    }

    /**
     * The function is going to be:
     *
     *      f(t) = e^kx + C
     *
     * with the constraints that f(0) = 0 (so C = -1) and the integral
     * of f(t) from 0 to 86,400 (or 24*60*60) is 50 (so power at one day
     * is 50, which is how I got the constant above).
     * @param rant the rant to be decayed.
     * @param currentTime the time at which the decay function started
     */
    private void changePower(Rant rant, long currentTime) {
        long creationTime = rant.getCreationDate().getMillis();
        long elapsedTime = currentTime - creationTime;
        // TODO (Bill): profile this line and make sure it isn't horribly inefficient
        double decay = Math.pow(Math.E, (RANT_DECAY_CONSTANT*elapsedTime)) - 1;
        rant.changePower(-decay);
    }
}
