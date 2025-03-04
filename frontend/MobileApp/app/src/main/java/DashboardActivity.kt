package com.example.helanewsreporting

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class DashboardActivity : AppCompatActivity() {

    private lateinit var btnLogout: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        btnLogout = findViewById(R.id.btnLogin)

        btnLogout.setOnClickListener {
            // Go back to Login Screen
            startActivity(Intent(this, LoginActivity::class.java))
            finish() // Close DashboardActivity
        }
    }
}
