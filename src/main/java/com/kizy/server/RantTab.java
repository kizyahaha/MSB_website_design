package com.kizy.server;

public enum RantTab {
    DAILY("daily", 0),
    HOURLY("hourly", 1),
    TEN_MINUTELY("ten_minutely", 2),
    MINUTELY("minutely", 3);

    public String displayName;
    public int tabNumber;

    private RantTab(String displayName, int tabNumber) {
        this.displayName = displayName;
        this.tabNumber = tabNumber;
    }

    public String getDisplayName() {
        return displayName;
    }

    public int getTabNumber() {
        return tabNumber;
    }

    @Override
    public String toString() {
        return "TAB[Tab Name: " + displayName + ", Tab Number: " + tabNumber + "]";
    }

    public static RantTab fromName(String name) {
        for (RantTab possible : values()) {
            if (possible.getDisplayName().equalsIgnoreCase(name)) {
                return possible;
            }
        }

        return null;
    }

    public static RantTab fromNumber(int number) {
        for (RantTab possible : values()) {
            if (possible.getTabNumber() == number) {
                return possible;
            }
        }

        return null;
    }
}
