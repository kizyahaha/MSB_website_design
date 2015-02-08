package com.kizy.data.item;

import java.io.IOException;
import java.util.TimerTask;

import com.kizy.data.database.DatabaseUtils;
import com.kizy.data.rant.Rant;

public class ExpireItemTask extends TimerTask {

    private final Item item;
    private final Rant rant;

    public ExpireItemTask(Item item, Rant rant) {
        this.item = item;
        this.rant = rant;
    }

    @Override
    public void run() {
        try {
            DatabaseUtils.expireItem(rant, item);
        } catch (IOException e) {
            throw new IllegalStateException("Could not expire item: " + item + " from rant: " + rant + ".", e);
        }
        rant.expireItem(item);
    }

}
