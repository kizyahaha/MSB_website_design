package com.kizy.data.rant;

public enum RantLevel {
    DAILY("Daily", 0),
    HOURLY("Hourly", 1),
    TEN_MINUTELY("10-Minutely", 2),
    MINUTELY("Minutely", 3);

    public String displayName;
    public int tabNumber;

    private RantLevel(String displayName, int tabNumber) {
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

    public static RantLevel fromName(String name) {
        for (RantLevel possible : values()) {
            if (possible.getDisplayName().equalsIgnoreCase(name)) {
                return possible;
            }
        }

        return null;
    }

    public static RantLevel fromNumber(int number) {
        for (RantLevel possible : values()) {
            if (possible.getTabNumber() == number) {
                return possible;
            }
        }

        return null;
    }
}
