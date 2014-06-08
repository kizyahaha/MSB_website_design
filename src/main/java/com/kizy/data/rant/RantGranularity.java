package com.kizy.data.rant;

public enum RantGranularity {
    DAILY("daily", 0),
    HOURLY("hourly", 1),
    TEN_MINUTELY("ten_minutely", 2),
    MINUTELY("minutely", 3);

    public String displayName;
    public int tabNumber;

    private RantGranularity(String displayName, int tabNumber) {
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

    public static RantGranularity fromName(String name) {
        for (RantGranularity possible : values()) {
            if (possible.getDisplayName().equalsIgnoreCase(name)) {
                return possible;
            }
        }

        return null;
    }

    public static RantGranularity fromNumber(int number) {
        for (RantGranularity possible : values()) {
            if (possible.getTabNumber() == number) {
                return possible;
            }
        }

        return null;
    }
}
