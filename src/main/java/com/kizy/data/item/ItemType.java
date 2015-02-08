package com.kizy.data.item;

import com.kizy.data.item.action.ChangeMultiplierAction;
import com.kizy.data.item.action.NoOpAction;

public enum ItemType implements Item {

    NOOP(0, "noop", 0, 0, "Does nothing", new NoOpAction()),
    ATTACK(1, "attack", 10, 60000, "", new ChangeMultiplierAction(.9f)),
    PROTECT(2, "protect", 10, 60000, "", new ChangeMultiplierAction(1.1f));

    private final int id;
    private final String name;

    private final int price;
    private final int durationMillis;
    private final String description;
    private final ItemAction action;

    private ItemType(int id, String name, int cost, int durationMillis, String description, ItemAction action) {
        this.id = id;
        this.name = name;
        this.price = cost;
        this.durationMillis = durationMillis;
        this.description = description;
        this.action = action;
    }

    @Override
    public long getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getPrice() {
        return price;
    }

    @Override
    public int getDurationMillis() {
        return durationMillis;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public ItemAction getAction() {
        return action;
    }

    public static ItemType byId(long id) {
        for (ItemType item : values()) {
            if (item.getId() == id) {
                return item;
            }
        }
        return NOOP;
    }

    public static ItemType byName(String name) {
        for (ItemType item : values()) {
            if (item.getName().equalsIgnoreCase(name)) {
                return item;
            }
        }
        return NOOP;
    }

}
