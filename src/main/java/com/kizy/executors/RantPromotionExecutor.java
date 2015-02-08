package com.kizy.executors;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import com.kizy.data.database.DatabaseUtils;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.RantLevel;


public class RantPromotionExecutor implements Runnable {

    private int runs = Calendar.getInstance().get(Calendar.HOUR)*60 + Calendar.getInstance().get(Calendar.MINUTE);

    @Override
    public void run() {
        runs++;
        promoteMinutely();
        if (runs % 10 == 0) {
            promoteTenMinutely();
        }
        if (runs % 60 == 0) {
            promoteHourly();
        }
        if (runs % (60 * 24) == 0) {
            promoteDaily();
            runs = 0;
        }
    }

    private static void promoteMinutely() {
        promoteWinner(RantLevel.MINUTELY);
    }

    private static void promoteTenMinutely() {
        promoteWinner(RantLevel.TEN_MINUTELY);
    }

    private static void promoteHourly() {
        promoteWinner(RantLevel.HOURLY);
    }

    private static void promoteDaily() {
        promoteWinner(RantLevel.DAILY);
    }

    private static void promoteWinner(RantLevel level) {
        try {
            List<Rant> rants = DatabaseUtils.findRantsByLevel(level);
            Rant winner = getWinner(rants);
            // Not actually changing it because we don't have enough inflow yet, but this is probably where it would go
            if (winner != null){
                //DatabaseUtils.writeWinner(DateTime.now(), winner.getRantId(), level);
            }
            else{
                //DatabaseUtils.writeWinner(DateTime.now(), 0, level);
            }
        } catch (IOException e) {
            System.err.println("Could not get " + level.getDisplayName() + " rants.");
        }
    }

    private static Rant getWinner(List<Rant> contenders) {
        if (contenders.isEmpty()) {
            return null;
        }
        Rant winner = contenders.get(0);
        for (Rant contender : contenders) {
            if (contender.getRantPower() > winner.getRantPower()) {
                winner = contender;
            }
        }
        return winner;
    }

}
