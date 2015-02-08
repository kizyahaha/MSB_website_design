package com.kizy.data.item;

import com.kizy.data.rant.Rant;
import com.kizy.data.user.User;

public interface ItemAction {

    void perform(Rant target, User user);

}
