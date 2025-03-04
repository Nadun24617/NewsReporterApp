package com.example.helanewsreporting

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Check if user is already logged in
        val sharedPreferences = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        val isLoggedIn = sharedPreferences.getBoolean("isLoggedIn", false)

        if (isLoggedIn) {
            // If already logged in, directly go to MainActivity
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            return
        }

        setContentView(R.layout.activity_login) // Make sure this XML exists

        // Find the login button by ID
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        // Set click listener to navigate to MainActivity
        btnLogin.setOnClickListener {
            // Save login state in SharedPreferences
            val editor = sharedPreferences.edit()
            editor.putBoolean("isLoggedIn", true)
            editor.apply()

            // Redirect to MainActivity
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish() // Close LoginActivity to prevent going back
        }
    }
}
