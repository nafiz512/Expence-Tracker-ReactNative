import { View, Text, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { router } from 'expo-router';

type transactionType = {
    user_id: string;
    amount: number;
    title: string;
    category: string;
}

const API_URL = "https://wallet-rn-server.onrender.com";

const useTransactions = (user_id: string) => {
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expence: 0
    })
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true);
    const fetchSummary = async () => {
        try {
            const res = await fetch(`${API_URL}/api/transaction/summary/${user_id}`);
            const result = await res.json();
            if (result.balance) {
                setSummary(result);
            }
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }
    const fetchTransactions = async () => {
        try {
            const res = await fetch(`${API_URL}/api/transaction/${user_id}`);
            const result = await res.json();
            if (result.length) {
                setTransactions(result);
            }
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }
    const loadData = useCallback(async () => {
        if (!user_id)
            return;
        setLoading(true)
        try {
            await Promise.all([fetchSummary(), fetchTransactions()])
        } catch (error) {
            console.error("Error fetching summary and transactions:", error);
        } finally {
            setLoading(false)
        }
    }, [fetchSummary, fetchTransactions, user_id])

    const deleteTransaction = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/transaction/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error in transaction delete");
            // Refresh data after deletion
            loadData();
            Alert.alert("Success", "Transaction deleted successfully");

        } catch (error) {
            console.error("Error deleting transaction:", error);
            // Alert.alert("Error", error instanceof Error ? error.message : String(error));
        }
    }
    const createTransaction = async (body: transactionType) => {
        if (!user_id)
            return;
        try {
            const res = await fetch(`${API_URL}/api/transaction`,
                {
                    method: "Post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            )
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            else {
                Alert.alert('Success', 'Data sent successfully!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to send data. Please try again.');
            console.log(error);
        }
        finally {
            if (router.canGoBack()) router.back()
        }
    }
    return { loading, summary, transactions, loadData, deleteTransaction, createTransaction };
}

export default useTransactions;