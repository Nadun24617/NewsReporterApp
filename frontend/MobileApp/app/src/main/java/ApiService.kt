package com.example.helanewsreporting.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("signup")
    fun signup(@Body request: SignupRequest): Call<SignupResponse>
}
