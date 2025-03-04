package com.example.helanewsreporting

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        try {
            // Check if the user is logged in
            val sharedPreferences = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
            val isLoggedIn = sharedPreferences.getBoolean("isLoggedIn", false)

            if (isLoggedIn) {
                setContentView(R.layout.dashboard)

                // Set up button click listeners for navigation
                findViewById<View>(R.id.btn_add_report)?.setOnClickListener {
                    startActivity(Intent(this, NewReportActivity::class.java))
                }

                findViewById<View>(R.id.btn_pending_reports)?.setOnClickListener {
                    startActivity(Intent(this, PendingReportActivity::class.java))
                }

                findViewById<View>(R.id.btn_approved_reports)?.setOnClickListener {
                    startActivity(Intent(this, ApprovedReportActivity::class.java))
                }

                findViewById<View>(R.id.btn_view_reports)?.setOnClickListener {
                    startActivity(Intent(this, ViewReportActivity::class.java))
                }

                findViewById<View>(R.id.menu_icon)?.setOnClickListener {
                    startActivity(Intent(this, SideMenuActivity::class.java))
                }

                // Logout Button
                findViewById<Button>(R.id.btnLogout)?.setOnClickListener {
                    val editor = sharedPreferences.edit()
                    editor.putBoolean("isLoggedIn", false)
                    editor.apply()

                    // Redirect to LoginActivity and clear back stack
                    val intent = Intent(this, LoginActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                    finish()
                }

            } else {
                // If the user is not logged in, redirect to LoginActivity
                val intent = Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()  // Close MainActivity
            }
        } catch (e: Exception) {
            // Log any errors that occur during onCreate
            Log.e("MainActivity", "Error occurred: ${e.message}", e)
        }
    }
}
