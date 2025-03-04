package com.example.helanewsreporting

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.helanewsreporting.R

class SideMenuActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.user_menu) // Ensure this layout file exists in res/layout/
    }
}
