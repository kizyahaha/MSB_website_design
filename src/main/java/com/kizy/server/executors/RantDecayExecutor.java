package com.kizy.server.executors;

import java.io.IOException;
import java.util.List;

import com.kizy.data.database.DatabaseUtils;
import com.kizy.data.rant.Rant;

public class RantDecayExecutor implements Runnable {

    private final static int RANT_DECAY = 0;

    @Override
    public void run() {
        //long start, end;
        //start = System.currentTimeMillis();
        //System.out.print("Decaying rants");
        try {
            List<Rant> rants = DatabaseUtils.getRants();
            for (Rant rant : rants) {
                rant.changePower(RANT_DECAY);
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

}
