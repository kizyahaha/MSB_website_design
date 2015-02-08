package com.kizy.data.item.action;

import com.kizy.data.item.ItemAction;
import com.kizy.data.rant.Rant;
import com.kizy.data.user.User;

public class ChangeMultiplierAction implements ItemAction {

    private final float multiplier;

    public ChangeMultiplierAction(float multiplier) {
        this.multiplier = multiplier;
    }

    @Override
    public void perform(Rant target, User user) {
        target.setVoteMultiplier(target.getVoteMultiplier() * multiplier);
    }

}
