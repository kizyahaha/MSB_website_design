package com.kizy.data.item.action;

import com.kizy.data.item.ItemAction;
import com.kizy.data.rant.Rant;
import com.kizy.data.user.User;

public class NoOpAction implements ItemAction {

    @Override
    public void perform(Rant target, User user) {
        // Do nothing (no-operation)
    }

}
