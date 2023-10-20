package com.campin.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {

    private ActionStatus status = ActionStatus.SUCCESS;
    private ArrayList<String> messages = new ArrayList<>();
    private T payload;

    public ActionStatus getStatus() {
        return status;
    }

    public T getPayload() {
        return payload;
    }

    public List<String> getMessages() {
        return new ArrayList<>(messages);
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public void addMessage(String message, ActionStatus status) {
        messages.add(message);
        this.status = status;
    }

    public boolean isSuccess() {
        return messages.size() == 0;
    }
}
