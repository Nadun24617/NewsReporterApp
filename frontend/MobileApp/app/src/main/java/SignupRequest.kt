package com.example.helanewsreporting.network

data class SignupRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val nic: String,
    val password: String,
    val contactNumber: String,
    val experience: String
)
