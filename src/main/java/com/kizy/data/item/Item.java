package com.kizy.data.item;

import com.kizy.data.Identifiable;

public interface Item extends Identifiable {

    String getName();

    int getPrice();

    int getDurationMillis();

    String getDescription();

    ItemAction getAction();

}
